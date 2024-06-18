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

//------------------- user details -------------------------------

export const getUsers = async () => {
    const userToken = localStorage.getItem('token')
    return await axios.get('http://localhost:2000/api/user/register/getUser', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

export const DeleteuserDetail = async (id) => {
    return await axios.delete(`http://localhost:2000/api/user/register/deleteUser/${id}`)
}

//------------------ contact -----------------------------------

export const getContact = async () => {
    return await axios.get('http://localhost:2000/api/contact/getDetail')
}

export const deleteContact = async (id) => {
    console.log(id, "ididididididididididid")
    return await axios.delete(`http://localhost:2000/api/contact/deleteDetail/${id}`)
}

//------------------ slider -------------------------------

export const getSlider = async () => {
    return await axios.get('http://localhost:2000/api/slider/getDetail')
}

// export const addSlider = async (data) => {
//     return await axios.post('http://localhost:2000/api/slider/insertDetail', data)
// }

export const addSlider = async (formData) => {
    try {
        const response = await axios.post('http://localhost:2000/api/slider/insertDetail', formData);
        console.log(response.data)
        return response;
    } catch (error) {
        console.error('Error adding slider:', error);
        throw error;
    }
};

export const deleteSlider = async (id) => {
    return await axios.delete(`http://localhost:2000/api/slider/deleteDetail/${id}`)
}