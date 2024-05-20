<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateContactRequest;
use App\Models\Contact;
use App\Rules\Cpf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'cpf' => ['required', 'unique:contacts', new Cpf],
            'email' => 'required|unique:contacts|email',
            'birthday' => 'required|date',
        ]);

        $contact = Contact::create($validatedData);

        return response()->json(["message" => "Contato criado com sucesso!"], 201);
    }

    public function show($id)
    {
        if (!$contact = Contact::find($id)) {
            return response()->json(['message' => 'Contato não encontrado'], 404);
        }
        return response()->json($contact);
    }

    // public function update(CreateContactRequest $request, string $id)
    // {
    //     if (!$contact = Contact::find($id)) {
    //         return response()->json(['message' => 'Contato não encontrado'], 404);
    //     }
    //     $validatedData = $request->validated();
    //     $contact->update($validatedData);

    //     return response()->json(['message' => 'Contato atualizado com sucesso!', 'contact' => $contact]);
    // }

    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'cpf' => ['required', 'unique:contacts,cpf,' . $contact->id, new Cpf],
            'email' => 'required|unique:contacts,email,' . $contact->id,
            'birthday' => 'required|date',
        ]);

        $contact->update($validatedData);

        return response()->json([
            'contact' => $contact,
            'message' => 'Contato atualizado com sucesso!'
        ], 200);
    }

    public function destroy($id)
    {
        if (!$contact = Contact::find($id)) {
            return response()->json(['message' => 'Contato não encontrado'], 404);
        }
        $contact->delete();

        return response()->json(['message' => 'Contato excluído com sucesso!']);
    }
}
