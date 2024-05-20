<?php

namespace App\Http\Requests;

use App\Rules\Cpf;
use Illuminate\Foundation\Http\FormRequest;

class CreateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=> [
                'required',
                'string',
                'min:3',
                'max:255'
            ],
            'cpf' => [
                'required',
                'unique:contacts,cpf',
                'min:11',
                'max:14',
                new Cpf
            ],
            'email' => [
                'required',
                'email',
                'unique:contacts,email'
            ],
            'birthday' => [
                'required',
                'date'
            ]
        ];
        // ● Nome Completo;
        // ● CPF - deve ser único no banco de dados;
        // ● E-mail - deve ser único no banco de dados;
        // ● Data de nascimento - salva no banco no formato ano/mês/dia (AAAA/MM/DD),
        // mas exibida para o cliente no formato dia/mês/ano (DD/MM/AAAA);
    }
}
