import { useState } from "react";
import hooks from "../hooks.tsx";
import "../style.css";

interface Errand {
    id: string;
    description: string;
    date: string;
    status? :boolean;
}

interface Props {
    errands?: Errand[]
}

interface ErrandRowProps {
    row: Errand;
}

const ErrandRow: React.FC<ErrandRowProps> = ({ row }) => {
    const [status, setStatus] = useState(row.status);
    const { mutate: updateStatus } = hooks.useUpdateErrandStatus();

    const handleCheckboxChange = () => {
        const newStatus = !status;
        setStatus(newStatus)
        updateStatus({ id: row.id, status: newStatus })
    };

    return (
        <tr className={`errand-row ${!row.status ? "row-faded" : ""}`}>
            <td>{row.description}</td>
            <td>{row.date}</td>
            <td>
                <input 
                    type="checkbox"
                    checked={status}
                    onChange={handleCheckboxChange}
                />
            </td>
        </tr>
    )

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
                        <ErrandRow key={row.id} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ErrandTable;
