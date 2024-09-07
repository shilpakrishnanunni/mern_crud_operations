import "../style.css";

interface Errand {
    id: string;
    description: string;
    date: string;
}

interface Props {
    errands?: Errand[]
}

const ErrandTable: React.FC<Props> = (props) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {props.errands?.map((row: Errand) => (
                        <tr key={row.id} className="errand-row">
                            <td>{row.description}</td>
                            <td>{row.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ErrandTable;
