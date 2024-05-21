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

    // public function store(CreatePhoneNumberRequest $request)
    // {
    //     $phoneNumber = PhoneNumber::create($request->validated());

    //     return response()->json(['message' => 'Número de telefone criado com sucesso!', 'phoneNumber' => $phoneNumber], 201);
    // }

    public function store(Request $request){
        $validatedData = $request->validate([
            'id_contactFK' => 'required|exists:contacts,id',
            'cellphone' => 'required|string|max:11',
            'residencialphone' => 'nullable|string|max:10',
            'commercialphone' => 'nullable|string|max:10',
        ]);
        $phone = PhoneNumber::create($validatedData);
        return response()->json(['message' => 'Telefones salvos com sucesso', 'phoneNumber' => $phone], 201);
    }

    public function show(string $id)
    {
        if (!$phoneNumber = PhoneNumber::find($id)) {
            return response()->json(['message' => 'Número de telefone não encontrado'], 404);
        }
        return response()->json($phoneNumber);
    }
    
    public function update(Request $request, PhoneNumber $phone)
    {
        $validatedData = $request->validate([
            'id_contactFK' => 'required|exists:contacts,id',
            'cellphone' => 'required|string|max:11',
            'residencialphone' => 'nullable|string|max:10',
            'commercialphone' => 'nullable|string|max:10',
        ]);

        $phone->update($validatedData);

        return response()->json(['message' => 'Telefones atualizados com sucesso'], 200);
    }

    public function destroy(string $id)
    {
        if (!$phoneNumber = PhoneNumber::find($id)) {
            return response()->json(['message' => 'Número de telefone não encontrado'], 404);
        }
        $phoneNumber->delete();

        return response()->json(['message' => 'Número de telefone excluído com sucesso!']);
    }

    public function findByFK(Request $request, string $id)
    {
        $phone = PhoneNumber::where('id_contactFK', $id)->first();

        if ($phone) {
                return response()->json($phone);
            } else {
                return response()->json(['message' => 'Nenhum numero de telefone encontrado para este ID de contato.'], 404);
            }
    }
}
