import { IProjectModel } from "../../models/projectModel";
import axiosInstance from "../../Services/configAxiosService";
import { AppDispatch } from "../store";
import {
  GET_PROJECT_ALL,
  SELECTED_PROJECT,
  UPDATE_ALL_PROJECT,
} from "../type/actionType";

export const getProjectAll = () => async (dispatch: AppDispatch) => {
  const res = await axiosInstance.get("/project");
  if (res) {
    dispatch({
      type: GET_PROJECT_ALL,
      payload: res.data,
    });
  }
};
export const selectedProjectItem =
  (project: IProjectModel) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: project,
    });
  };

export const updateListProjectAction =
  (listProject: IProjectModel[]) => async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_ALL_PROJECT,
      payload: listProject,
    });
  };
// export const getProductById =
//   (currProduct: IProduct) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch({
//         type: GET_PRODUCT_DETAIL,
//         payload: currProduct,
//       });
//     } catch (error) {
//       console.error("Failed to Get Product Detail", error);
//     }
//   };
// export const createProduct =
//   (productData: IProduct) => async (dispatch: AppDispatch) => {
//     try {
//       const res = await axios.post(
//         "https://6601396987c91a11641a5652.mockapi.io/products",
//         productData
//       );

//       if (res.status === 201) {
//         // Assuming the response contains the newly created product data
//         dispatch({
//           type: CREATE_PRODUCT,
//           payload: res.data,
//         });
//       }
//     } catch (error) {
//       // Handle error, maybe dispatch an error action
//       console.error("Error creating product:", error);
//     }
//   };
// export const updateProduct =
//   (id: string, updatedProductData: IProduct) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       const res = await axios.put(
//         `https://6601396987c91a11641a5652.mockapi.io/products/${id}`,
//         updatedProductData
//       );

//       if (res.status === 200) {
//         dispatch({
//           type: UPDATE_PRODUCT,
//           payload: res.data, // Assuming the response contains the updated product data
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };
// export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {
//   try {
//     // Perform the delete operation using Axios or any other HTTP client
//     await axios.delete(
//       `https://6601396987c91a11641a5652.mockapi.io/products/${id}`
//     );
//     dispatch({
//       type: DELETE_PRODUCT,
//       payload: id, // Pass the ID of the deleted product as payload
//     });
//   } catch (error) {
//     // Handle error, maybe dispatch an error action
//     console.error("Error deleting product:", error);
//   }
// };
