

export default function ProfileBookList( { bookList } : any) {
    return (
        bookList.map((book: any) => (
            <tr key={book.id} className="text-leftborder-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                    <img className="h-20 p-2" src={book.Livros.imageLink} alt="capa do livro" />
                </th>
                <td className="px-6 py-4">
                {book.Livros.titulo}
                </td>
                <td className="px-6 py-4">
                {book.nota}
                </td>
                <td className="px-6 py-4">
                {book.status}
                </td>
                <td className="px-6 py-4">
                {book.paginasLidas} / {book.Livros.paginas}
                </td>
        </tr>
        ))
    )
}