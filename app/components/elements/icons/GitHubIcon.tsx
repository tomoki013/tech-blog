import { FaGithub } from 'react-icons/fa';
import IconItem from './IconItem';

const GitHubIcon: React.FC = () => {
    return (
        <IconItem href='https://github.com/tomoki013'>
            <FaGithub />
        </IconItem>
    );
}

export default GitHubIcon;
