<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Address::all();
        return response()->json($addresses);
    }

    // public function store(Request $request)
    // {
    //     $address = Address::create($request->validated());

    //     return response()->json(['message' => 'Endereço criado com sucesso!', 'address' => $address], 201);
    // }

    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'id_contactFK' => 'required|exists:contacts,id',
        'cep' => 'required|string|max:9',
        'street' => 'required|string|max:255',
        'number' => 'required|string|max:6',
        'neighborhood' => 'required|string|max:255',
        'city' => 'required|string|max:255',
        'state' => 'required|string|max:2',
      ]);
  
      $address = Address::create($validatedData);
  
      return response()->json(['message' => 'Endereço salvo com sucesso'], 201);
    }

    public function show(string $id)
    {
        if (!$address = Address::find($id)) {
            return response()->json(['message' => 'Endereço não encontrado'], 404);
        }
        return response()->json($address);
    }

    public function update(Request $request, Address $address)
    {
        $validatedData = $request->validate([
            'id_contactFK' => 'required|exists:contacts,id',
            'cep' => 'required|string|max:9',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:6',
            'neighborhood' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:2',
        ]);

        $address->update($validatedData);

        return response()->json(['message' => 'Endereço atualizado com sucesso'], 200);
    }

    public function destroy(string $id)
    {
        if (!$address = Address::find($id)) {
            return response()->json(['message' => 'Endereço não encontrado'], 404);
        }
        $address->delete();

        return response()->json(['message' => 'Endereço excluído com sucesso!']);
    }

    public function findByFK(Request $request, string $id)
    {
        $address = Address::where('id_contactFK', $id)->first();

        if ($address) {
                return response()->json($address);
            } else {
                return response()->json(['message' => 'Nenhum endereço encontrado para este ID de contato.'], 404);
            }
    }
}
