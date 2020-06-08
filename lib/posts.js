import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

const getSortedPostData = () => {
    //Get file name under /post
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        //Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        //Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        //Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        //Return an Object contains the file ID and the respective content
        return {
            id,
            ...matterResult.data,
        };
    });

    //Sort post by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }

        return -1;
    });
};

const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
};

const getPostData = async (id) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    //Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContent);

    //Use remark ot convert markdown into Html string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    //Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
};

export { getSortedPostData, getAllPostIds, getPostData };
