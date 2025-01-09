export interface ArticleProps {
    title: string;
    date: string[];
    content: string;
}

const Article = ({ title, date, content }: ArticleProps) => {
    return (
        <article>
            <h1>{title}</h1>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    );
}

export default Article;
