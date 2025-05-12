<script>
  import { createEventDispatcher } from 'svelte';

  let title = '';
  let description = '';
  let dueDate = '';
  let showSuccess = false; // Controla a exibição do popup
  const dispatch = createEventDispatcher();

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
      if (!title) {
          alert('O título é obrigatório!');
          return;
      }

      const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              user_id: 1, // ID do usuário (fixo ou dinâmico)
              title,
              description,
              due_date: dueDate,
              status: 'pending',
          }),
      });

      if (response.ok) {
          showSuccess = true; // Mostra o popup
          setTimeout(() => (showSuccess = false), 3000); // Esconde o popup após 3 segundos
          dispatch('taskAdded'); // Emite o evento para o App.svelte
          title = '';
          description = '';
          dueDate = '';
      } else {
          alert('Erro ao adicionar tarefa.');
      }
  };
</script>

<div class="p-6 bg-gray-100 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4 text-gray-800">Adicionar Nova Tarefa</h2>
  <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
      <input
          id="title"
          type="text"
          bind:value={title}
          placeholder="Digite o título da tarefa"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
  </div>
  <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
      <textarea
          id="description"
          bind:value={description}
          placeholder="Digite a descrição da tarefa"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
  </div>
  <div class="mb-4">
      <label for="dueDate" class="block text-sm font-medium text-gray-700">Data de Vencimento</label>
      <input
          id="dueDate"
          type="date"
          bind:value={dueDate}
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
  </div>
  <button
      on:click={addTask}
      class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
      Adicionar Tarefa
  </button>

  <!-- Popup de sucesso -->
  {#if showSuccess}
      <div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Tarefa adicionada com sucesso!
      </div>
  {/if}
</div>