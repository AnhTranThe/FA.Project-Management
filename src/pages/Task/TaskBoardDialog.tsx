import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function TaskBoardDialog({ isNewTask, dialogVisible }: { isNewTask: boolean, dialogVisible: boolean }) { }
return (
    <Dialog
        header={isNewTask ? "Add Task" : "Update Task"}
        visible={dialogVisible}
        style={{ width: "550px" }}
        onHide={() => {
            setDialogVisible(false);

        }}>
        <form className="p-fluid" onSubmit={() => {
            console.log(1);
        }}>
            <div className="p-field  my-4">
                <label>User Email</label>

            </div>
            <div className="p-field  my-4">
                <label>Project Id</label>

            </div>
            <div className="p-field  my-4">
                <label>Status</label>
                <br />

            </div>
            <div className="p-field mb-4 flex justify-content-end mt-5">
                <div className="flex">
                    <Button
                        type="button"
                        label="Cancel"
                        className="p-button-text underline"
                        onClick={() => {
                            setDialogVisible(false);
                            handleCancel();
                        }}
                    />
                    <Button
                        label={isNewTask ? "Create" : "Update"}
                        severity="success"
                        type="submit"
                    />
                </div>
            </div>
        </form>
    </Dialog>
)
}
