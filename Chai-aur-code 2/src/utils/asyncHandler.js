const asncyHandler = () =>{
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err)=> next(err))
    }
}

export {asncyHandler}



/* TRY & Catch method for asncyHandler*/

// const asyncHandler = (fnc)=> async (req, res, next) =>{
//     try {
//         await fnc(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }