import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { ArrowRight, User, FileText, Calculator, TrendingUp, Users, CheckCircle, PlayCircle } from 'lucide-react';

interface WorkflowStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  stakeholders: string[];
  detailsPlaceholder: string;
}

const workflowStages: WorkflowStage[] = [
  {
    id: 'request',
    title: 'Initial Project Request',
    description: 'Employee submits AI project proposal',
    icon: <FileText className="w-6 h-6" />,
    status: 'completed',
    estimatedTime: '1-2 days',
    stakeholders: ['Requesting Employee', 'Assigned Analyst', 'Gustavo Vargas',], 
    detailsPlaceholder: 'Project request form, initial business case, problem statement, expected outcomes'
  },
  {
    id: 'dept-review',
    title: 'Intake Review',
    description: 'AI department determines the relevance to business goals, availability of data and any duplication of request',
    icon: <User className="w-6 h-6" />,
    status: 'in-progress',
    estimatedTime: '3-5 days',
    stakeholders: ['Ben Webb','Gustavo Vargas' , 'Charlotte Cao', 'Jenna Kempster-Taylor'],
    detailsPlaceholder: 'Project use case screening. Is more information needed? Is it useful and unique? From first glance, can we achieve this? Is it worth doing? Has it been done before? Prioritization score is calculated.',
  },
  {
    id: 'tech-feasibility',
    title: 'Technical Feasibility',
    description: 'IT and AI teams assess technical requirements and feasibility of requested project',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'in-progress',
    estimatedTime: '3-4 days',
    stakeholders: ['Assigned Developer', 'Charlotte Cao'],
    detailsPlaceholder: 'Technical architecture review, data requirements, infrastructure needs, risk assessment. Assigned developer will communicate with Charlotte and assess projects feasibility. Charlotte will report to Gustavo', 
  },
  {
    id: 'cost & ROI-analysis',
    title: 'Cost and ROI Analysis',
    description: 'The finance or AI team estimates project costs and works with IT Budget Manager. Projects ROI and break-even timeline is calculated',
    icon: <Calculator className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '3-5 days',
    stakeholders: ['Jenna Kempster-Taylor', 'Charlotte Cao', 'IT Budget Manager', 'Financial Team'],
    detailsPlaceholder: 'Financial analyst or AI team calculates: estimated cost (compute, licenses, labor), projected savings/revenue impact, ROI and break-even timeline. This will be reviewed by AI Department Head.',
  },

  {
    id: 'resource-allocation',
    title: 'Resource Allocation',
    description: 'Identify and assign the appropriate personnel, tools, and intrastructure required to execute the approved AI project. The team identifies roles needed for the project.',
    icon: <Users className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '2-3 days',
    stakeholders: ['Jenna Kempster-Taylor', 'Charlotte Cao', 'Ben Webb','Gustavo Vargas'],
    detailsPlaceholder: 'Project manager defines the team structure and reports to Ben or Gustavo as needed. This includes assessing current availability, technical skill match, and potential cross-functional dependencies. Project manager check bandwidth and availability and estimates project duration'
  },
  {
    id: 'final-approval',
    title: 'Executive Approval. AIM Methodology Approval FG1',
    description: 'A project brief is presented to the VP by Ben or Gustavo, covering the summary, ROI, team requirements, and timeline. If approved, the project is either added to the backlog or scheduled for execution.',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '1-2 days',
    stakeholders: ['Diofanto Rosales', 'Ben Webb', 'Gustavo Vargas'],
    detailsPlaceholder: 'Executive summary, final budget approval, strategic impact assessment, go/no-go decision'
  },
  {
    id: 'project-kickoff',
    title: 'Project Kickoff',
    description: 'Initialize project and begin execution',
    icon: <PlayCircle className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '1 day',
    stakeholders: ['Project Manager', 'Assigned Team'],
    detailsPlaceholder: 'Project manager leads project charter, milestone planning, communication plan, success metrics definition and reports to senior leadership as needed'
  }
];

const getStatusColor = (status: WorkflowStage['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getStatusBadgeColor = (status: WorkflowStage['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

export function WorkflowVisualization() {
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Project Workflow</h1>
        <p className="text-gray-600">Flex Enterprise AI Team</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowStages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${getStatusColor(stage.status)}`}
                    onClick={() => setSelectedStage(stage)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {stage.icon}
                          <Badge className={`${getStatusBadgeColor(stage.status)} text-white`}>
                            {stage.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          Step {index + 1}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{stage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                      <div className="text-xs text-gray-500">
                        <div className="mb-1">⏱️ {stage.estimatedTime}</div>
                        <div>👥 {stage.stakeholders.length} stakeholder(s)</div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {stage.icon}
                      {stage.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm">Description</h4>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="mb-2 text-sm">Estimated Timeline</h4>
                      <p className="text-sm text-gray-600">{stage.estimatedTime}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm">Key Stakeholders</h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.stakeholders.map((stakeholder, idx) => (
                          <Badge key={idx} variant="outline">
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm">Details & Requirements</h4>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600 italic">
                          {stage.detailsPlaceholder}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          * Additional details can be added here
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm">Current Status</h4>
                      <Badge className={`${getStatusBadgeColor(stage.status)} text-white`}>
                        {stage.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Arrow connector */}
              {index < workflowStages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}

              {/* Vertical arrow for mobile/tablet */}
              {index < workflowStages.length - 1 && (
                <div className="lg:hidden flex justify-center py-2">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process Summary */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl mb-4">Process Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">8</div>
            <div className="text-sm text-gray-600">Total Stages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">20-30</div>
            <div className="text-sm text-gray-600">Days (Estimated)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">15+</div>
            <div className="text-sm text-gray-600">Stakeholders Involved</div>
          </div>
        </div>
      </div>
    </div>
  );
}