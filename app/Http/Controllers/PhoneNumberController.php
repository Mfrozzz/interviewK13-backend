<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePhoneNumberRequest;
use App\Http\Requests\UpdatePhoneNumberRequest;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;

class PhoneNumberController extends Controller
{
    public function index()
    {
        $phoneNumbers = PhoneNumber::all();
        return response()->json($phoneNumbers);
    }

    public function store(CreatePhoneNumberRequest $request)
    {
        $phoneNumber = PhoneNumber::create($request->validated());

        return response()->json(['message' => 'Número de telefone criado com sucesso!', 'phoneNumber' => $phoneNumber], 201);
    }

    public function show(string $id)
    {
        if (!$phoneNumber = PhoneNumber::find($id)) {
            return response()->json(['message' => 'Número de telefone não encontrado'], 404);
        }
        return response()->json($phoneNumber);
    }

    public function update(UpdatePhoneNumberRequest $request, string $id)
    {
        if (!$phoneNumber = PhoneNumber::find($id)) {
            return response()->json(['message' => 'Número de telefone não encontrado'], 404);
        }
        $validatedData = $request->validated();
        $phoneNumber->update($validatedData);

        return response()->json(['message' => 'Número de telefone atualizado com sucesso!', 'phoneNumber' => $phoneNumber]);
    }

    public function destroy(string $id)
    {
        if (!$phoneNumber = PhoneNumber::find($id)) {
            return response()->json(['message' => 'Número de telefone não encontrado'], 404);
        }
        $phoneNumber->delete();

        return response()->json(['message' => 'Número de telefone excluído com sucesso!']);
    }
}
