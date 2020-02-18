import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
    /**Alinha todos oss elementos dentro do form botão e caixa da texto na horizontal */
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
`;

const rotate = keyframes`
from {
    transform : rotate(0deg);
}
to {
    transform : rotate(360deg);
}
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled:
        props.loading /** Atribui a disabled o valor da propriedade loading */,
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    /** Centraliza a imagem do icone */
    display: flex;
    justify-content: center;
    align-items: center;

    /*Estilos quando o botão for precionado
    Quando usamos o & estamos referindo ao elemento que está sendo estilizado*/

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    /**Passa por propriedade o que deve ser feito caso a propriedade loading seja verdadeira */
    ${props =>
        props.loading && // OPERADOr
        css`
            /**Cria a animação circular */
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between; /**Dá espaço entre os itens */
        align-items: center;

        /** REferencia o elemento li e verifica se existe algum li
         acima dele e aplica o efeito caso tenha */
        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #7159c1;
            text-decoration: none;
        }
    }
`;
