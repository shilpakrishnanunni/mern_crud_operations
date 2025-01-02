import { useState } from "react";
import hooks from "../hooks.tsx";
import "../style.css";

interface Errand {
    id: string;
    description: string;
    date: string;
    status?: boolean;
}

interface Props {
    errands?: Errand[];
}

interface ErrandRowProps {
    row: Errand;
}

const ErrandRow: React.FC<ErrandRowProps> = ({ row }) => {
    const [status, setStatus] = useState(row.status);
    const { mutate: updateStatus } = hooks.useUpdateErrandStatus();
    const { mutate: deleteErrand } = hooks.useDeleteErrand();

    const handleCheckboxChange = () => {
        const newStatus = !status;
        setStatus(newStatus);
        updateStatus({ id: row.id, status: newStatus });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this errand?")) {
            deleteErrand({ id: row.id });
        }
    };

    return (
        <tr className={`errand-row ${row.status ? "row-faded" : ""}`}>
            <td>
                <input
                    type="checkbox"
                    checked={status}
                    onChange={handleCheckboxChange}
                />
            </td>
            <td>{row.description}</td>
            <td>{row.date}</td>
            <td className="delete-cell">
                <span
                    className="delete-icon"
                    onClick={handleDelete}
                    role="button"
                    title="Delete Errand"
                >
                    X
                </span>
            </td>
        </tr>
    );
};

const ErrandTable: React.FC<Props> = (props) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>DESCRIPTION</th>
                        <th>DATE</th>
                        <th></th>
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
