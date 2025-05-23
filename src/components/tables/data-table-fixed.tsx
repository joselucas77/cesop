"use client";

import { useState, useEffect } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { Label } from "@/components/ui/label";
import { Download, Filter, Loader2, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Efeito para aplicar o filtro de datas quando as datas mudarem
  useEffect(() => {
    // Aplicar filtro de datas na coluna createdAt
    if (startDate || endDate) {
      table.getColumn("createdAt")?.setFilterValue({ startDate, endDate });
    } else {
      table.getColumn("createdAt")?.setFilterValue(undefined);
    }
  }, [startDate, endDate, table]);

  // Função para limpar todos os filtros, incluindo as datas
  const clearAllFilters = () => {
    table.resetColumnFilters();
    setStartDate(undefined);
    setEndDate(undefined);
    setIsOpen(false);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const doc = new jsPDF();

      // Função auxiliar para traduzir o status
      const translateStatus = (status: string) => {
        switch (status) {
          case "PENDING":
            return "Pendente";
          case "IN_PROGRESS":
            return "Em Andamento";
          case "COMPLETED":
            return "Concluído";
          case "REJECTED":
            return "Rejeitado";
          case "APPROVED":
            return "Aprovado";
          case "CANCELLED":
            return "Cancelado";
          default:
            return status;
        }
      };

      // Pegar apenas as colunas visíveis
      const visibleColumns = table.getVisibleFlatColumns();
      const filteredRows = table.getFilteredRowModel().rows;

      // Configuração do cabeçalho do PDF
      doc.setFont("helvetica", "bold");
      doc.text("Relatório de Requisições", 14, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        `Data de geração: ${format(new Date(), "dd/MM/yyyy HH:mm", {
          locale: ptBR,
        })}`,
        14,
        22
      );
      doc.text(`Total de registros: ${filteredRows.length}`, 14, 28);

      // Adicionar informações de filtro de data, se aplicável
      let yPos = 28;
      if (startDate || endDate) {
        yPos += 6;
        doc.text(
          `Período: ${
            startDate
              ? format(startDate, "dd/MM/yyyy", { locale: ptBR })
              : "Início"
          } até ${
            endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Hoje"
          }`,
          14,
          yPos
        );
      }

      // Preparar cabeçalhos - apenas das colunas visíveis
      const headers = visibleColumns.map((column) => {
        return (column.columnDef.header as string) ?? column.id;
      });

      // Preparar dados - apenas das colunas visíveis
      const tableData = filteredRows.map((row) => {
        return visibleColumns.map((column) => {
          // Pegar o valor da célula
          const cellValue = row.getValue(column.id);

          // Tratamento especial para status - agora com tradução
          if (column.id === "status") {
            return translateStatus(cellValue as string);
          }

          // Tratamento especial para zona (que pode ter valor não informado)
          if (column.id === "zone" && !cellValue) {
            return "Não informado";
          }

          // Tratamento especial para datas
          if (column.id === "createdAt" && cellValue) {
            return format(new Date(cellValue as string), "dd/MM/yyyy", {
              locale: ptBR,
            });
          }

          // Valor padrão
          return cellValue ? String(cellValue) : "";
        });
      });

      // Configurar e gerar a tabela no PDF
      await autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: yPos + 7,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [66, 66, 66],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 35 },
        didDrawPage: () => {
          // Adicionar rodapé em cada página
          const pageNumber = doc.getCurrentPageInfo().pageNumber;
          const totalPages = doc.getNumberOfPages();
          doc.setFontSize(8);
          doc.text(
            `Página ${pageNumber} de ${totalPages}`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: "center" }
          );
        },
      });

      // Download do PDF
      doc.save(
        `requisicoes_${format(new Date(), "dd-MM-yyyy_HH-mm", {
          locale: ptBR,
        })}.pdf`
      );
      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Colunas visíveis</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.columnDef.header as string}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader className="mb-4">
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Utilize os filtros abaixo para refinar sua busca
                </SheetDescription>
              </SheetHeader>
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="grid gap-4 p-4">
                  {/* Filtro de período */}
                  <div className="space-y-2">
                    <Label>Período</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <DatePicker
                          date={startDate}
                          onDateChange={setStartDate}
                          placeholder="Data inicial"
                        />
                      </div>
                      <div>
                        <DatePicker
                          date={endDate}
                          onDateChange={setEndDate}
                          placeholder="Data final"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2">
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isDownloading ? "Gerando PDF..." : "Baixar PDF"}
          </Button>
        </div>
      </div>

      <div className="rounded-md border w-full overflow-hidden">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  Sem resultados encontrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} resultados encontrados
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
