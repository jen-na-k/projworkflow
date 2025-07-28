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
    stakeholders: ['Requesting Employee', 'Direct Manager'],
    detailsPlaceholder: 'Project request form, initial business case, problem statement, expected outcomes'
  },
  {
    id: 'dept-review',
    title: 'Department Review',
    description: 'Department head evaluates alignment with business goals',
    icon: <User className="w-6 h-6" />,
    status: 'completed',
    estimatedTime: '3-5 days',
    stakeholders: ['Department Head', 'Business Analyst'],
    detailsPlaceholder: 'Strategic alignment assessment, priority scoring, resource availability check'
  },
  {
    id: 'tech-feasibility',
    title: 'Technical Feasibility',
    description: 'IT and AI teams assess technical requirements',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'in-progress',
    estimatedTime: '5-7 days',
    stakeholders: ['AI Team Lead', 'IT Infrastructure', 'Data Scientists'],
    detailsPlaceholder: 'Technical architecture review, data requirements, infrastructure needs, risk assessment'
  },
  {
    id: 'cost-analysis',
    title: 'Cost Analysis',
    description: 'Finance team calculates project costs and budget',
    icon: <Calculator className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '3-4 days',
    stakeholders: ['Finance Team', 'Procurement', 'IT Budget Manager'],
    detailsPlaceholder: 'Hardware costs, software licensing, personnel costs, operational expenses, timeline-based budget breakdown'
  },
  {
    id: 'roi-analysis',
    title: 'ROI Analysis',
    description: 'Business case evaluation and return on investment',
    icon: <TrendingUp className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '4-6 days',
    stakeholders: ['Finance Analyst', 'Business Intelligence', 'Operations Manager'],
    detailsPlaceholder: 'Expected benefits quantification, payback period, NPV calculation, risk-adjusted returns'
  },
  {
    id: 'resource-allocation',
    title: 'Resource Allocation',
    description: 'Assign team members and allocate resources',
    icon: <Users className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '2-3 days',
    stakeholders: ['HR Business Partner', 'Project Manager', 'Team Leads'],
    detailsPlaceholder: 'Team composition, skill requirements, availability matrix, training needs assessment'
  },
  {
    id: 'final-approval',
    title: 'Executive Approval',
    description: 'Senior leadership final decision and sign-off',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '1-2 days',
    stakeholders: ['VP of Operations', 'CTO', 'CFO'],
    detailsPlaceholder: 'Executive summary, final budget approval, strategic impact assessment, go/no-go decision'
  },
  {
    id: 'project-kickoff',
    title: 'Project Kickoff',
    description: 'Initialize project and begin execution',
    icon: <PlayCircle className="w-6 h-6" />,
    status: 'pending',
    estimatedTime: '1 day',
    stakeholders: ['Project Manager', 'Assigned Team', 'Stakeholders'],
    detailsPlaceholder: 'Project charter, milestone planning, communication plan, success metrics definition'
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
        <h1 className="text-3xl mb-2">AI Project Approval Workflow</h1>
        <p className="text-gray-600">Manufacturing & Supply Chain Enterprise AI Team</p>
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
                          * Additional details can be added here based on your specific requirements
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