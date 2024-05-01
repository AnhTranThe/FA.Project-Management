import { Dialog } from "primereact/dialog";

export default function TaskBoardAddEditDialog({ isNewTask, dialogVisible, onHide }: { isNewTask: boolean, dialogVisible: boolean, onHide: () => void }) {
    return (
        <>
            <Dialog
                header={isNewTask ? "Create new issue" : "Update Task"}
                visible={dialogVisible}
                style={{ width: "550px" }}
                onHide={onHide}>
                {/* <form className="p-fluid" onSubmit={handleSubmit}>
                    <div className="p-field  my-4">
                        <label>User Email</label>
                        <select
                            className="w-full px-2 py-3 border-round"
                            defaultValue={values.user_mail}
                            name="user_mail"
                            onChange={handleChangeSelectTask}>
                            <option value="">pls choose email</option>
                            {listUser?.map((ele: { email: string }) => {
                                return (
                                    <option value={ele.email} key={ele.email}>
                                        {ele.email}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.user_mail && touched.user_mail && (
                            <span className="text-red-500">{errors.user_mail}</span>
                        )}
                    </div>
                    <div className="p-field  my-4">
                        <label>Project Id</label>
                        <select
                            className="w-full px-2 py-3 border-round"
                            defaultValue={values.project_id}
                            name="project_id"
                            onChange={handleChangeSelectTask}>
                            <option value="">pls choose project</option>
                            {listProject?.map((ele: { id: string; name: string }) => {
                                return (
                                    <option value={ele.id} key={ele.id}>
                                        {ele.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.project_id && touched.project_id && (
                            <span className="text-red-500">{errors.project_id}</span>
                        )}
                    </div>
                    <div className="p-field  my-4">
                        <label>Status</label>
                        <br />
                        <input
                            defaultValue={values.status}
                            className="px-3 py-2 w-full"
                            type="number"
                            name="status"
                            required
                            onChange={handleChangeInput}
                            onBlur={handleBlur}
                        />
                        {errors.status && touched.status && (
                            <span className="text-red-500">{errors.status}</span>
                        )}
                    </div>
                    <div className="p-field  my-4">
                        <label>Note</label>
                        <br />
                        <input
                            defaultValue={values.note}
                            className="px-3 py-2 w-full"
                            type="text"
                            name="note"
                            required
                            onChange={handleChangeInput}
                            onBlur={handleBlur}
                        />
                        {errors.note && touched.note && (
                            <span className="text-red-500">{errors.note}</span>
                        )}
                    </div>
                    <div className="p-field my-4">
                        <label>Time start</label>
                        <br />
                        <input
                            value={values.time_start}
                            className="px-3 py-2 w-full"
                            type="date"
                            name="time_start"
                            required
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="p-field my-4">
                        <label>Time end</label>
                        <br />
                        <input
                            value={values.time_end}
                            className="px-3 py-2 w-full"
                            type="date"
                            name="time_end"
                            required
                            onChange={handleChangeInput}
                        />
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
                </form> */}
            </Dialog>

        </>
    )
}
