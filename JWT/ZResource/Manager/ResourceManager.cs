using ZResource.Helpers;
using Microsoft.SqlServer.Types;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace ZResource.Managers
{
    public class ResourceManager
    {
        /// <summary>
        /// Adds File to Database
        /// </summary>
        /// <param name="info"></param>
        /// <param name="hierarchyId">Folder Directory of user uploading file</param>
        /// <returns></returns>
        public Guid AddResource(ResourceInfo info, string hierarchyId)
        {
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter("[dbo].[AddFileByParentId]", AppConfManager.ConnectionString))
                {
                    info.ResourceId = Guid.NewGuid();
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;

                    adapter.SelectCommand.Parameters.AddWithValue("@ResourceId", info.ResourceId);
                    var nodeParam = adapter.SelectCommand.Parameters.Add("@UserHierarchyId", SqlDbType.Udt);
                    nodeParam.Value = SqlHierarchyId.Parse(hierarchyId); // Microsoft.sqlserver.types
                    nodeParam.UdtTypeName = "HierarchyId";

                    adapter.SelectCommand.Parameters.AddWithValue("@FileExtension", info.FileExtension);
                    adapter.SelectCommand.Parameters.AddWithValue("@FileData", info.Data);

                    adapter.SelectCommand.Connection.Open();
                    adapter.SelectCommand.ExecuteNonQuery();
                    adapter.SelectCommand.Connection.Close();
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                throw new Exception(CodeHelper.UnableToAddFile);
            }

            return info.ResourceId;
        }
        
        public List<ResourceInfo> GetResourceList_Log(long crId)
        {
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter("[dbo].[GetFilesByCrId_Log]", AppConfManager.ConnectionString))
                {
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.SelectCommand.Parameters.AddWithValue("@CrId", crId);
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);

                    return (from row in dt.AsEnumerable()
                            select new ResourceInfo
                            {
                                SystemFileName = row["OriginalFileName"].ToString(),
                                OriginalFileName = row["DownloadFileName"].ToString()
                            }).ToList();
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                throw new Exception(CodeHelper.UnableToGetFiles);
            }
        }
        
        public ResourceInfo GetResource(string fileName)
        {
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter("[dbo].[GetFileByStreamId]", AppConfManager.ConnectionString))
                {
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.SelectCommand.Parameters.AddWithValue("@streamId", fileName);
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);

                    if (dt != null && dt.Rows.Count > 0)
                        return new ResourceInfo() { Data = (byte[])dt.Rows[0]["FileData"] };

                    throw new Exception(CodeHelper.UnableToGetFiles);
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        public ResourceInfo GetResourceWithFileType(string fileName)
        {
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter("[dbo].[GetFileByStreamId_V1]", AppConfManager.ConnectionString))
                {
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.SelectCommand.Parameters.AddWithValue("@streamId", fileName);
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);

                    if (dt != null && dt.Rows.Count > 0)
                        return new ResourceInfo() { Data = (byte[])dt.Rows[0]["FileData"], FileExtension = dt.Rows[0]["FileExtension"] != null && dt.Rows[0]["FileExtension"] != DBNull.Value ? (string)dt.Rows[0]["FileExtension"] : String.Empty };

                    throw new Exception(CodeHelper.UnableToGetFiles);
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        public string GetFolderName(string folderPath)
        {
            if (!String.IsNullOrEmpty(folderPath))
            {
                var folders = folderPath.Split('.');
                if (folders.Length > 0 && folders[1] != null)
                    return folders[1];
            }

            throw new Exception(CodeHelper.UnableToFindFolder);
        }

        /// <summary>
        /// Delete Resource
        /// </summary>
        /// <param name="hierarchyId"></param>
        /// <returns></returns>
        public bool DeleteResource(Guid? resourceId)
        {
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter("[dbo].[DeleteResource]", AppConfManager.ConnectionString))
                {
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;

                    adapter.SelectCommand.Parameters.AddWithValue("@ResourceId", resourceId);
                    adapter.SelectCommand.Connection.Open();

                    int rows_affected = adapter.SelectCommand.ExecuteNonQuery();

                    adapter.SelectCommand.Connection.Close();

                    if (rows_affected > 0)
                        return true;

                    return false;
                }

            }
            catch (Exception)
            {
                throw new Exception(CodeHelper.UnableToDeleteFile);
            }

        }

    }

    public class ResourceInfo
    {
        public Guid ResourceId { get; set; }
        public string SystemFileName { get; set; }
        public string OriginalFileName { get; set; }
        public string FileExtension { get; set; }
        public string DataUrl { get; set; }
        public byte[] Data { get; set; }

    }

    public class ContractResourceInfo
    {
        public Guid ResourceId { get; set; }
        public string SystemFileName { get; set; }
        public string OriginalFileName { get; set; }
        public string DocumentType { get; set; }
        public string FileExtension { get; set; }
        public int? DocumentTypeId { get; set; }
        public string Category { get; set; }
        public string Remark { get; set; }
        public bool inEditMode { get; set; }
        public string DataUrl { get; set; }
        public byte[] Data { get; set; }

    }
}
