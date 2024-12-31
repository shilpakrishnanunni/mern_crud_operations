import hooks from "../hooks";
import "../style.css";

const ErrandForm = (props) => {
    const formSubmission = hooks.useCreateErrand();

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = e.target.elements.description.value.trim();
        formSubmission.mutate({ description });
        e.target.reset();
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" placeholder="ENTER DESCRIPTION" name="description" />
                </div>
                <div className="input-field submit-button">
                    <button type="submit">ADD ERRAND</button>
                </div>
            </form>
        </div>
    );
};

export default ErrandForm;
