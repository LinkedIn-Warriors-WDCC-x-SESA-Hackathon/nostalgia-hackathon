const StandardHeadImports = ({title, children}) => {
    return <>
        <head>
            <title>{title}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap" rel="stylesheet"/>
        </head>
        <body>
            {children}
        </body>
        
    </>
}

export default StandardHeadImports