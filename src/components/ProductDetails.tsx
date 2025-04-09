import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"

type ProductDetailsProps = {
    product: Product;
};

export async function action({params}: ActionFunctionArgs){
    if(params.id !== undefined){
        await deleteProduct(+params.id)
    }
    
    return redirect("/")
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    
    // Fetcher es muy util cuando queremos hacer interacciones y mantenernos en esa misma pagina
    //por ejemplo cuando damos like a un tweet o algun reel, etc
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                    >Editar
                    </button>

                    <Form
                    // Tengo que ponerlo aca porque el div con el flex solo afecta al primer nivel de hijos
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        // onSubmit se ejecuta antes que el action
                        onSubmit={e => {
                            if(!confirm("¿Seguro que desea eliminar?")){
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
