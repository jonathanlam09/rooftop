import swal from "sweetalert2";

export const successResponse = async (data: string) => {
    return await swal.fire({
        title: "Success!",
        text: data,
        icon: "success",
        confirmButtonColor: "cornflowerblue"
    })
}

export const warningResponse = (text: string) => {
    swal.fire({
        title: "Warning!",
        text: text,
        icon: "warning",
        confirmButtonColor: "cornflowerblue"
    })
}

export const errorResponse = (text = null) => {
    swal.fire({
        title: "Error!",
        text: text ? text : "",
        icon: "error",
        confirmButtonColor: "cornflowerblue"
    })
}

export const questionResponse = async (data: string) => {
    return await swal.fire({
        title: "Are you sure?",
        icon: "question",
        text: data,
        showCancelButton: true,
        confirmButtonColor: "#b3e0ff",
        cancelButtonColor: "lightgrey"
    })
}

export const toCurrencyWithoutDecimals = (value : number) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export const toCurrencyWithDecimals = (value : number) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}