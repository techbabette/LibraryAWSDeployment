<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthorUpdateRequest extends FormRequest
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
    protected function prepareForValidation(): void
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }

    public function rules(): array
    {
        return [
            "id" => "required|exists:authors,id",
            "name" => "required|string|regex:/^[A-Z][a-z]{1,14}(\s[A-Z][a-z]{1,14}){0,2}$/",
            "last_name" => "required|string|regex:/^[A-Z][a-z]{1,14}(\s[A-Z][a-z]{1,14}){0,2}$/"
        ];
    }
}
