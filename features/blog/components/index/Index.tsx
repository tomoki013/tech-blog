const Index: React.FC = () => {
    return (
        <section className="bg-[var(--bg-color)] rounded-md p-2">
            <h2>目次</h2><hr />
            <ol>
                <li>
                    1
                    <ul>
                        <li>.</li>
                        <li>.</li>
                        <li>.</li>
                    </ul>
                </li>
                <li>
                    2
                    <ul>
                        <li>.</li>
                    </ul>
                </li>
                <li>
                    3
                    <ul>
                        <li>.</li>
                    </ul>
                </li>
            </ol>
        </section>
    );
}

export default Index;
