import { useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import ProductDetails from '../component/ProductDetails'
import ProductForm from '../component/ProductForm'
import {fetchSellerProducts} from '../actions/action'

const ProductManage = () => {
    
    const selector =useSelector((state)=>state.reducer)
    const sellerProducts = useSelector((state) => state.SellerProductReducer.sellerProducts);
    const dispatch = useDispatch()
    localStorage.setItem('sellerPage',true)
    useEffect(() => { 
        dispatch(fetchSellerProducts())
        console.log("products seller",sellerProducts)
        
    },[selector])

    return (
        <div className="home">
            <div className='buyer'>
                {sellerProducts && sellerProducts.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
            </div>
            <ProductForm />
        </div>
    )
}

export default ProductManage