async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();

    return data;
}

async function createData<T>(url: string, raw: string): Promise<T> {
    var myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
}

async function updateData(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

async function patchData(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

async function deleteData(url: string) {
    const response = await fetch(url, {
        method: 'Delete'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

}

export { fetchData, createData, updateData, deleteData, patchData }