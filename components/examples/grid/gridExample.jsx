import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import useParentWidth from '../resizing/resizingParent';
import { Card } from "@material-tailwind/react";
import { CardAction, CardContent } from '@/components/ui/card';
import { CardHeader } from 'react-bootstrap';
import { CardTitle } from '@/components/ui/card';
import CreateJobAppDialog from '../../create-job-dialog';
import { Plus } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { createJobApplication } from '@/lib/actions/job-applications';
import { toast } from 'react-toastify';
//import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

import AnimatedGridPage from './animated-grid/animated-grid-page';
import { getScrollbarWidth } from '@progress/kendo-react-common';
import { CalendarMonth } from '@mui/icons-material';
import BootCard from '../card/bootCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  })
}));

export default function ResponsiveGrid() {

  const INITIAL_FORM_DATA = {
    company: "",
    position: "",
    location: "",
    status: "",
    order: 0,
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [childRef, parentWidth] = useParentWidth();
  const [showCreateJobDialog, setShowCreateJobDialog] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

  }

  const handleOpenChange = (newOpenState) => {
    if (!newOpenState) {
      // Dialog is closing, reset the form fields and errors
      setFormData(INITIAL_FORM_DATA);
    }
    setShowCreateJobDialog(newOpenState);
  };

  return (

    <Box sx={{ flexGrow: 1, width: "auto" }}>
      <Grid container alignItems="stretch" style={{ height: '100%', width: '100%' }} spacing={2.0}>
        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md mb-2 rounded-sm">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2 w-auto`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a]   text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonth style={{ width: 20, height: 20, marginRight: 4 }} />Wish List
                  </span>
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>
            <CardContent style={{ padding: 1 }}>
              <Grid direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <div className='outer-container'>
                  <div className='inner-content'>
                    {/* <ScrollArea className="h-175" style={{ padding: 4 }}> */}
                    <AnimatedGridPage />

                    {/* </ScrollArea> */}
                  </div>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md mb-2 rounded-lg">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2 w-auto`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a] text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  Applied
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg" dir="rtl">
                <Grid container align="stretch" className="mr-1" direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                      <div className='flex flex-row border-[#e57dff] w-35 items-center gap-1 border-[2.5px] px-2 py-1 rounded-md'>
                        <span className='flex items-start text-sm text-[#04335a] w-10px'>Applied {index + 1}</span>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </ScrollArea>
            </CardContent>
          </Card>
        </Grid>

        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md mb-2 rounded-lg">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2 w-auto`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a] text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  Interviewing
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg" dir="rtl">
                <Grid container align="stretch" direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                      <Item className='border-l-[2.5px] border-l-[#e57dff] flex-3 w-40'>
                        <div>
                          <span className='text-sm text-gray-500 w-10px'>Interviewing {index + 1}</span>
                        </div>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </ScrollArea>
            </CardContent>
          </Card>
        </Grid>
        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md mb-2 rounded-lg">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2 w-auto`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a] text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  Offers
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg" dir="rtl">
                <Grid container align="stretch" direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                      <Item className='border-l-[2.5px] border-l-[#e57dff] flex-3 w-40'>
                        <div>
                          <span className='text-sm text-gray-500 w-10px'>Offers {index + 1}</span>
                        </div>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </ScrollArea>
            </CardContent>
          </Card>
        </Grid>
        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md hover:shadow-xl mb-2 rounded-lg">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a] text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  Rejected
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg" dir="rtl">
                <Box sx={{ flexGrow: 1, border: '1px solid #e0e0e0', borderRadius: 2.5, p: 2, boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.1)', width: 'auto' }}>
                  <Grid container align="stretch" direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(15)).map((_, index) => (
                      <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item className='border-l-[2.5px] border-l-[#e57dff] flex-3 w-40'>
                          <div>
                            <span className='text-sm text-gray-500 w-10px'>Rejected {index + 1}</span>
                          </div>
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </ScrollArea>
            </CardContent>
          </Card>
        </Grid>
        <Grid size="grow">
          <Card className="w-auto shrink-0 shadow-md mb-2 rounded-lg">
            <CardHeader
              style={{
                borderBottom: '3.0px solid #0086C4',
                backgroundColor: '#EBF4F7'
              }}
              className={`text-[#021524] rounded-t-sm rounded-b-xs pb-1 mb-2 w-auto`}>
              <div className="flex flex-row mt-1 justify-between mr-2">
                <CardTitle className="text-[#04335a] text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
                  Archived
                </CardTitle>
                <CardAction onClick={() => setShowCreateJobDialog(true)}
                  className={`text-sm
                    cursor-pointer
                    mt-1 mb-1`}
                >
                  <CreateJobAppDialog open={showCreateJobDialog} onOpenChange={handleOpenChange} />
                </CardAction>
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg" dir="rtl">
                <Grid container align="stretch" direction="column" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                      <Item className='border-l-[2.5px] border-l-[#e57dff] flex-3 w-40'>
                        <div>
                          <span className='text-sm text-gray-500 w-10px'>Company Name</span>
                        </div>
                        {index + 1}
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </ScrollArea>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}