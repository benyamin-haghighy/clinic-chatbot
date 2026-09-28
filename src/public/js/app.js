async function api(url, options={}) {
  const config={...options, headers:{...(options.headers||{})}};
  if(options.body && typeof options.body === 'object') {
    config.headers['Content-Type']='application/json';
    config.body=JSON.stringify(options.body);
  }
  const response=await fetch(url,{...config,credentials:'include'});
  const text=await response.text();
  let data={};
  try{data=text?JSON.parse(text):{}}catch{data={message:text}};
  if(!response.ok){
    const message=data.message || (Array.isArray(data.errors)?data.errors.join('، '):'درخواست انجام نشد');
    throw new Error(message);
  }
  return data;
}
