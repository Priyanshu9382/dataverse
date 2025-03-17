// export const AsyncHandler = (func) => async (req, res) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Writing an async function handler which removes the use to continuously write the try catch syntax instead it handles based on promises.
const AsyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}
export {AsyncHandler}