import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Article.module.scss';

export interface ArticleProps {
    title: string;
    date: string;
    content: string;
}

const Article = ({ title, date, content }: ArticleProps) => {
    return (
        <article>
            <h1 className="text-center">{title}</h1><hr />
            <p className="text-right">{date}</p>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`" prose text-[var(--reverse-color)]" ${styles.doc} `}
            >{content}</ReactMarkdown>
        </article>
    );
}

export default Article;
