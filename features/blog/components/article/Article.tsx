import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Article.module.scss';
import * as Elements from '@/app/components/elements/index';

export interface ArticleProps {
    title: string;
    date: string;
    content: string;
    tags: string[];
}

const Article = ({ title, date, content, tags = [] }: ArticleProps) => {
    return (
        <article>
            <h1 className="text-center">{title}</h1><hr />
            <p className="text-right">{date}</p>
            <Elements.Tags tags={tags} hideAll />
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`" prose text-[var(--reverse-color)]" ${styles.doc} `}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}

export default Article;
