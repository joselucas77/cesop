export interface RequestData {
  id: number;
  protocol: string;
  serviceName: string;
  status: string;
  requestDate: Date;
  description: string;
  requester: string;
  contactEmail?: string;
  contactPhone: string;
  location: string;
  estimatedCompletionDate: Date;
  assignedDepartment: string;
  priority: string;
  lastUpdate: Date;
  comments: Array<{
    date: Date;
    author: string;
    content: string;
  }>;
  attachments: Array<{
    name: string;
    url: string;
  }>;
}

export interface RequestDataForSupport {
  protocol: string;
  servico: string;
  data: Date;
  status: string;
  cidadao: {
    nome: string;
    email: string;
    telefone: string;
  };
  descricao: string;
}
