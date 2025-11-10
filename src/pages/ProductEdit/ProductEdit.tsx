import { Input } from '@/components/Input/productEditInput';
import { Select } from '@/components/Select/productEditSelect';
import { Textarea } from '@/components/Textarea/productEditTextarea';
import { Button } from '@/components/Button/productEditButton';
import { useProduct } from '@/context/ProductEditContext';
import { Navbar } from '@/components/Navbar/productEditNavbar'
import { useNavigate } from 'react-router-dom'

const tipoProdutoOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'produto', label: 'Produto' },
  { value: 'servico', label: 'Serviço' },
  { value: 'materia-prima', label: 'Matéria Prima' },
];

const marcaOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'marca1', label: 'Marca 1' },
  { value: 'marca2', label: 'Marca 2' },
  { value: 'marca3', label: 'Marca 3' },
];

const categoriaOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'categoria1', label: 'Categoria 1' },
  { value: 'categoria2', label: 'Categoria 2' },
  { value: 'categoria3', label: 'Categoria 3' },
];

const fornecedorOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'fornecedor1', label: 'Fornecedor 1' },
  { value: 'fornecedor2', label: 'Fornecedor 2' },
  { value: 'fornecedor3', label: 'Fornecedor 3' },
];

const unidadeOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'un', label: 'Unidade' },
  { value: 'kg', label: 'Quilograma' },
  { value: 'lt', label: 'Litro' },
];

export function ProductEdit() {
  const navigate = useNavigate();
  const { product, updateProduct, saveProduct, cancelEdit } = useProduct();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
            <div className="max-w-[1600px] mx-auto px-8 py-8">
                <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">
                    Páginas / Cadastros Básicos / Produtos
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Edição de Dados Básicos do Produto
                </h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select
                        label="Tipo de Produto"
                        required
                        options={tipoProdutoOptions}
                        value={product.tipoProduto}
                        onChange={(e) => updateProduct('tipoProduto', e.target.value)}
                    />
                    <Input
                        label="Código"
                        required
                        placeholder="Código informado"
                        value={product.codigo}
                        onChange={(e) => updateProduct('codigo', e.target.value)}
                    />
                    <Input
                        label="PathNumber"
                        required
                        placeholder="Pathnumber informado"
                        value={product.pathNumber}
                        onChange={(e) => updateProduct('pathNumber', e.target.value)}
                    />
                    <Select
                        label="Marca"
                        required
                        options={marcaOptions}
                        value={product.marca}
                        onChange={(e) => updateProduct('marca', e.target.value)}
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Descrição"
                        required
                        placeholder="Descrição informada"
                        value={product.descricao}
                        onChange={(e) => updateProduct('descricao', e.target.value)}
                    />
                    <Select
                        label="Categoria"
                        required
                        options={categoriaOptions}
                        value={product.categoria}
                        onChange={(e) => updateProduct('categoria', e.target.value)}
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select
                        label="Fornecedor"
                        required
                        options={fornecedorOptions}
                        value={product.fornecedor}
                        onChange={(e) => updateProduct('fornecedor', e.target.value)}
                    />
                    <Input
                        label="Valor do Item"
                        required
                        placeholder="Valor informado"
                        value={product.valorItem}
                        onChange={(e) => updateProduct('valorItem', e.target.value)}
                    />
                    <Select
                        label="Unidade"
                        required
                        options={unidadeOptions}
                        value={product.unidade}
                        onChange={(e) => updateProduct('unidade', e.target.value)}
                    />
                    <Input
                        label="Estoque Mínimo"
                        required
                        placeholder="Valor informado"
                        value={product.estoqueMinimo}
                        onChange={(e) => updateProduct('estoqueMinimo', e.target.value)}
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Descrição Resumida"
                        required
                        placeholder="Descrição resumida informada"
                        value={product.descricaoResumida}
                        onChange={(e) => updateProduct('descricaoResumida', e.target.value)}
                    />
                    <Input
                        label="Custo Cliente"
                        placeholder="Informe o valor"
                        value={product.custoCliente}
                        onChange={(e) => updateProduct('custoCliente', e.target.value)}
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        label="Custo Cliente"
                        placeholder="Informe o valor"
                        value={product.custoCliente}
                        onChange={(e) => updateProduct('custoCliente', e.target.value)}
                    />
                    <Input
                        label="Medida"
                        placeholder="Informe o valor"
                        value={product.medida}
                        onChange={(e) => updateProduct('medida', e.target.value)}
                    />
                    <Input
                        label="Validade do Desconto"
                        placeholder="Informe uma validade"
                        value={product.validadeDesconto}
                        onChange={(e) => updateProduct('validadeDesconto', e.target.value)}
                    />
                    <Input
                        label="Voltagem"
                        placeholder="Informe um valor de voltagem"
                        value={product.voltagem}
                        onChange={(e) => updateProduct('voltagem', e.target.value)}
                    />
                    </div>

                    <Textarea
                    label="Observação"
                    placeholder="Informe um resumo"
                    value={product.observacao}
                    onChange={(e) => updateProduct('observacao', e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        label="Data de Cadastro"
                        placeholder="Log da data"
                        disabled
                        value={product.dataCadastro}
                        onChange={(e) => updateProduct('dataCadastro', e.target.value)}
                    />
                    <Input
                        label="Usuário que Cadastrou"
                        placeholder="Log do usuário"
                        disabled
                        value={product.usuarioCadastro}
                        onChange={(e) => updateProduct('usuarioCadastro', e.target.value)}
                    />
                    <Input
                        label="Data de Alteração"
                        placeholder=""
                        disabled
                        value={product.dataAlteracao}
                        onChange={(e) => updateProduct('dataAlteracao', e.target.value)}
                    />
                    <Input
                        label="Usuário que Alterou"
                        placeholder=""
                        disabled
                        value={product.usuarioAlterou}
                        onChange={(e) => updateProduct('usuarioAlterou', e.target.value)}
                    />
                    </div>

                    <div className="flex justify-between pt-4">
                    <Button variant="danger" onClick={cancelEdit}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={saveProduct}>
                        Atualizar
                    </Button>
                    </div>
                </div>
                </div>
            </div>
    </div>
  );
}
