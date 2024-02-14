export const Loading = () => {
  return (
    <div className="fixed flex justify-center items-center w-screen h-screen text-white top-0 left-0 bg-slate-700">
      <div className="text-center">
        <h1 className='font-semibold text-3xl mb-4'>Please wait...</h1>
        <span>Getting you location</span>
      </div>
    </div>
  );
};