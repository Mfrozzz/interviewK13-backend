<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePhoneNumberRequest extends FormRequest
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
            'cellphone' => [
                'nullable',
                'string',
                'max:11'
            ],
            'residencialphone' => [
                'nullable',
                'string',
                'max:10'
            ],
            'commercialphone' => [
                'nullable',
                'string',
                'max:10'
            ],
        ];
    }
}
