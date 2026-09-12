

export async function createProduct(req, res) {

    const user = req.user

    if(user.role !== "seller"){
        return res.status(403).json({
            message:"Only sellers can create products"
        })
    }

    const {title, description, price:{amount, currency}, categories, sizes } = req.body

    const errors = []

    if(!title){
        errors.push({
            field:"title",
            message:"Title is required"
        })
    }

    if(title && (title.length < 3 || title.length > 100)){
        errors.push()
    }

}