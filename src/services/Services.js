import axios from "axios";


//------------------ packages ----------------------------
export const addPackage = async (data) => {
    return await axios.post('http://localhost:2000/api/package/addPackage', data);
}

export const handleUpdatePackage = async (packid, formdata) => {

    return await axios.put(`http://localhost:2000/api/package/updatePackage/${packid}`,
        formdata
    )

}

export const deletePackage = async (id) => {
    return await axios.delete(`http://localhost:2000/api/package/deletePackage/${id}`)
}

//------------------- destination ---------------------------
export const getDestination = async () => {
    return await axios.get('http://localhost:2000/api/destination/getDesti')
}

export const AddDestination = async (data) => {
    return await axios.post('http://localhost:2000/api/destination/postDesti', data)
}

export const UpdateDestination = async (destid, data) => {
    return await axios.put(`http://localhost:2000/api/destination/updateDesti/${destid}`, data)
}

export const DeleteDestination = async (id) => {
    return await axios.delete(`http://localhost:2000/api/destination/deleteDesti/${id}`)
}