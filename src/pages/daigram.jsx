import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { toPng } from "html-to-image";

const fileStructure = `
graph TB;
    A[REACTBLOG]
    A --> B[node_modules]
    A --> C[public]
    A --> D[src]
    D --> D1[appwrite]
    D1 --> D2[auth.js]
    D1 --> D3[config.js]
    D --> E[assets]
    E --> E1[blogLogo.png]
    E --> E2[react.svg]
    D --> F[components]
    F --> F1[Container]
    F1 --> F2[Container.jsx]
    F --> F3[Footer]
    F3 --> F4[Footer.jsx]
    F --> F5[Header]
    F5 --> F6[Header.jsx]
    F5 --> F7[LogoutBtn.jsx]
    F --> F8[postForm]
    F8 --> F9[PostForm.jsx]
    F --> F10[subComponents]
    F10 --> F11[Button.jsx]
    F10 --> F12[Input.jsx]
    F10 --> F13[Logo.jsx]
    F10 --> F14[PostCardAllPost.jsx]
    F10 --> F15[PostCards.jsx]
    F10 --> F16[RTE.jsx]
    F10 --> F17[Selector.jsx]
    D --> G[conf]
    G --> G1[config.js]
    D --> H[pages]
    H --> H1[AddPost.jsx]
    H --> H2[AllPosts.jsx]
    H --> H3[EditPost.jsx]
    H --> H4[Home.jsx]
    H --> H5[Login.jsx]
    H --> H6[Post.jsx]
    H --> H7[Signup.jsx]
    D --> I[store]
    D --> J[App.jsx]
    D --> K[index.js]
    D --> L[main.jsx]
    A --> M[.env.sample]
    A --> N[.gitignore]
    A --> O[eslint.config.js]
    A --> P[index.html]
    A --> Q[License.md]
    A --> R[package-lock.json]
    A --> S[package.json]
`;

export default function FileStructureDiagram() {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  const saveAsImage = () => {
    if (diagramRef.current) {
      // Expand width to fit content before capturing
      const originalWidth = diagramRef.current.style.width;
      diagramRef.current.style.width = "fit-content";

      toPng(diagramRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "file-structure-diagram.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Restore original width after capturing
          diagramRef.current.style.width = originalWidth;
        })
        .catch((err) => console.error("Error capturing image:", err));
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Project Structure
      </h2>
      <div
        ref={diagramRef}
        className="overflow-x-auto border rounded-lg p-2 bg-gray-100"
      >
        <div className="mermaid min-w-[300px]">{fileStructure}</div>
      </div>
      <button
        onClick={saveAsImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save as Image
      </button>
    </div>
  );
}
