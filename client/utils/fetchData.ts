const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data ? data : { data: [] };
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
};

export default fetchData;
