

const ErrandForm = (props) => {
    return (
        <div className="form-container">
            <form>
                <div>
                    <input type="text" placeholder="ENTER DESCRIPTION"/>
                </div>
                <div>
                    <button type="submit">ADD ERRAND</button>
                </div>
            </form>
        </div>
    );
};

export default ErrandForm;
