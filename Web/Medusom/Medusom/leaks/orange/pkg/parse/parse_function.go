package parse

import (
	"github.com/orange-lang/orange/pkg/ast"
	"github.com/orange-lang/orange/pkg/token"
	"github.com/orange-lang/orange/pkg/types"
)

func (p parser) parseFunc() *ast.FunctionStmt {
	fn := &ast.FunctionStmt{
		Static: p.allow(token.Static),
	}

	p.expect(token.Def)

	if p.peek(token.LT) {
		fn.GenericTypes = p.parseGenericList()
	}

	if p.allow(token.BitNot) {
		fn.Destructor = true
	}

	fn.Name = p.expect(token.Identifier).Value

	p.expect(token.OpenParen)
	fn.Parameters, _ = p.parseVarDeclList(false)
	p.expect(token.CloseParen)

	if p.allow(token.Arrow) {
		fn.RetType = p.parseType()
	}

	fn.Body = p.parseBlock()

	return fn
}

func (p parser) parseGenericList() (tys []types.Type) {
	p.expect(token.LT)

	tyName := p.expect(token.Identifier).Value
	tys = append(tys, &types.Named{Name: tyName})

	for p.allow(token.Comma) {
		tyName = p.expect(token.Identifier).Value
		tys = append(tys, &types.Named{Name: tyName})
	}

	p.expect(token.GT)

	return
}

func (p parser) parseExternFunc() *ast.ExternFuncStmt {
	fn := &ast.ExternFuncStmt{}

	p.expect(token.Extern)
	p.expect(token.Def)

	fn.Name = p.expect(token.Identifier).Value

	p.expect(token.OpenParen)
	fn.Parameters, fn.VariableArgument = p.parseVarDeclList(true)
	p.expect(token.CloseParen)

	if p.allow(token.Arrow) {
		fn.RetType = p.parseType()
	} else {
		fn.RetType = &types.Void{}
	}

	return fn
}

func (p parser) parseVarDeclList(allowVarArg bool) (params []*ast.ParamDecl, isVarArg bool) {
	params = []*ast.ParamDecl{}

	if !p.peek(token.Identifier) {
		return
	}

	params = append(params, p.parseParam())

	for p.allow(token.Comma) {
		if allowVarArg && p.allow(token.Elipsis) {
			isVarArg = true
			break
		}

		params = append(params, p.parseParam())
	}

	return
}

func (p parser) parseParam() *ast.ParamDecl {
	name := p.expect(token.Identifier).Value

	p.expect(token.Colon)
	ty := p.parseType()

	return &ast.ParamDecl{Name: name, Type: ty}
}
