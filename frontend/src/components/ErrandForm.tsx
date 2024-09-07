import "../style.css";

const ErrandForm = (props) => {
    return (
        <div className="form-container">
            <form>
                <div className="input-field">
                    <input type="text" placeholder="ENTER DESCRIPTION"/>
                </div>
                <div className="input-field submit-button">
                    <button type="submit">ADD ERRAND</button>
                </div>
            </form>
        </div>
    );
};

export default ErrandForm;