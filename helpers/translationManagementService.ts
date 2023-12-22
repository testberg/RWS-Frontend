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

async function updatehData<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: 'PUT' });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
}

async function deleteData<T>(url: string) {
    const response = await fetch(url, {
        method: 'Delete'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

}

export { fetchData, createData, updatehData, deleteData }