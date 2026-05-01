// COLUMNS TO INSERT: [
//   {
//     name: 'Wish List',
//     boardId: null,
//     order: 0,
//     jobApplications: [],
//     _id: new ObjectId('699f5721811f188309ad1e3c')
//   },
//   {
//     name: 'Applied',
//     boardId: null,
//     order: 1,
//     jobApplications: [],
//     _id: new ObjectId('699f5721811f188309ad1e3d')
//   },
//   {
//     name: 'Interviewing',
//     boardId: null,
//     order: 2,
//     jobApplications: [],
//     _id: new ObjectId('699f5721811f188309ad1e3e')
//   },
//   {
//     name: 'Offers',
//     boardId: null,
//     order: 3,
//     jobApplications: [],
//     _id: new ObjectId('699f5721811f188309ad1e3f')
//   },
//   {
//     name: 'Rejected',
//     boardId: null,
//     order: 4,
//     jobApplications: [],
//     _id: new ObjectId('699f5721811f188309ad1e40')
//   }
// ]



// {<Dialog open={open} onOpenChange={setOpenAndClose}>

//             <DialogContent onInteractOutside={(e) => e.preventDefault()}
//               className="min-w-155 max-w-200 bg-[#f4f9fd]">
//               <DialogHeader>
//                 <DialogTitle>
//                   <div className="flex items-center text-[#ee1010] gap-2 text-2xl mb-1">
//                     <MdWarning className="text-[#ee1010] w-7 h-7 mb-1" />
//                     Delete Column
//                   </div>
//                   <Divider sx={{ borderBottomWidth: 3, borderColor: '#86838591', marginBottom: 4 }} />
//                   <span className="flex mb-2 mt-4 font-semibold text-[#5e5897]">
//                     Column Name: "{column.name}"
//                   </span>
//                 </DialogTitle>
//                 <DialogDescription>
//                   <span className="text-[28px] text-[#dd111f] font-semibold">
//                     This action cannot be undone !
//                   </span>
//                 </DialogDescription>
//               </DialogHeader>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button className="mr-2 bg-slate-200 text-md hover:bg-slate-300 text-black" type="button">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button className="mr-2 bg-[#d90e1c] text-md hover:bg-[#ff0000] text-white" onClick={() => handleDeleteColumn(column._id, boardId)}>
//                   Delete Column
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog> }