
export default function UpdateJobModal({ jobId, columnId, boardId }) {
  
  return (
    <div>
      <label forhtml="input-group-1" className="block mb-2.5 text-sm font-medium text-heading">Your Email</label>
      <div className="relative">
        <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
        </div>
        <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
      </div>
      <label forhtml="website-admin" className="block mb-2.5 text-sm font-medium text-heading">Username</label>
      <div className="flex shadow-xs rounded-base">
        <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 1 1 6 0Z" /></svg>
        </span>
        <input type="text" id="website-admin" className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" placeholder="elonmusk" />
      </div>

      <label forhtml="website" className="block mb-2.5 text-sm font-medium text-heading">Website</label>
      <div className="flex shadow-xs rounded-base">
        <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
          https://
        </span>
        <input type="text" id="website" className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" placeholder="flowbite.com" />
      </div>

    </div >
  );
} 