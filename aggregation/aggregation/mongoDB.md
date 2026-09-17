# Indexinding & B+ trees in MongoDB

=> Indexing in MongoDB is a technique used to improve the performance of queries by creating data structures that allow for faster retrieval of documents. Indexes can be created on one or more fields in a collection, enabling MongoDB to quickly locate documents that match specific criteria without having to scan the entire collection.

=>When a query is executed, MongoDB checks if there are any indexes that can be used to optimize the query. If an appropriate index exists, MongoDB will use it to quickly find the matching documents. If no suitable index is found, MongoDB will perform a collection scan, which can be slower and less efficient.

=>Collection scanning is a process in MongoDB to retrieve documents from a collection by examining each document in the collection. This process is typically used when there are no indexes available to optimize the query, resulting in a full scan of the collection.

=>Collection scanning can be inefficient for large collections, as it requires reading every document to find the matching results. To improve performance, it is recommended to create appropriate indexes on fields that are frequently queried.

=>B+ trees are a type of data structure used in MongoDB to implement indexes. They allow for efficient searching, insertion, and deletion of documents by maintaining a balanced tree structure. B+ trees enable MongoDB to quickly locate documents based on indexed fields, reducing the time required for query execution.

=>Index scan & fetch !!!
query engine in MongoDB uses a two-step process to retrieve documents when an index is used. The first step is the index scan, where the query engine traverses the B+ tree structure of the index to find the relevant entries that match the query criteria. Once the matching entries are identified, the second step is the fetch phase, where MongoDB retrieves the actual documents from the collection based on the document identifiers obtained from the index scan.

=>S2 cells are a spatial indexing technique used in MongoDB to efficiently index and query geospatial data. S2 cells divide the Earth's surface into a hierarchical grid of cells, allowing for efficient representation and querying of geographic locations. By using S2 cells, MongoDB can quickly determine which documents fall within a specified geographic area, improving the performance of geospatial queries.