import axiosInstance from "@/axios/axios";
import Vue from "vue";
import router from '../../router/router';
import LimitToFullWords from "@/lib/limitToFullWords";
export default {
    namespaced : true,
    state : {
        adminTabs : {
            "Active loans" : {
                "title" : "Loan",
                "weight" : 90,
                "endpoint" : "loan?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "User",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Book",
                        "field" : "book.name"
                    },
                    {
                        "text" : "Loaned on",
                        "field" : "started_at"
                    },
                    {
                        "text" : "Return by",
                        "field" : "end" 
                    },
                    {
                        "text" : "Extended",
                        "field" : "extended",
                        "change" : function(item){
                            return item.extended ? 'Yes' : 'No'
                        }
                    },
                ],
                "itemOptions" : [
                    {
                        "name" : "Extend",
                        "class" : "btn btn-success mx-1",
                        "onClick" : "patch|loan/extend",
                        "onlyIf" : function (item) {
                            return !item.extended;
                        }
                    },
                    {
                        "name" : "Return",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "patch|loan/return"
                    },
                    {
                        "name" : "View book",
                        "class" : "btn btn-primary mx-1",
                        "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                    },
                ],
                items : [],
                searchInputs : {
                    "since" : {
                        label : "Loaned after",
                        field_type : "datetime"
                    }
                },
                searchParams : {
                    "since" : undefined
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Late loans" : {
                "title" : "Loan",
                "weight" : 90,
                "endpoint" : "loan?panel=true&late=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "User",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Book",
                        "field" : "book.name"
                    },
                    {
                        "text" : "Loaned on",
                        "field" : "started_at"
                    },
                    {
                        "text" : "Return by",
                        "field" : "end" 
                    },
                    {
                        "text" : "Days late",
                        "field" : "end",
                        "change" : function(item){
                            let currentDate = new Date().getTime();
                            let returnBy = new Date(item.end);
                            let daysLate = Math.ceil((currentDate - returnBy) / (1000 * 60 * 60 * 24)); 
                            return daysLate;
                        }
                    },
                    {
                        "text" : "Extended",
                        "field" : "extended",
                        "change" : function(item){
                            return item.extended ? 'Yes' : 'No'
                        }
                    },
                ],
                "itemOptions" : [
                    {
                        "name" : "Extend",
                        "class" : "btn btn-success mx-1",
                        "onClick" : "patch|loan/extend",
                        "onlyIf" : function (item) {
                            return !item.extended;
                        }
                    },
                    {
                        "name" : "Return",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "patch|loan/return"
                    },
                    {
                        "name" : "View book",
                        "class" : "btn btn-primary mx-1",
                        "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                    },
                ],
                items : [],
                searchInputs : {
                    "since" : {
                        label : "Loaned after",
                        field_type : "datetime"
                    }
                },
                searchParams : {
                    "since" : undefined
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Books" : {
                "title" : "Book",
                "weight" : 90,
                "endpoint" : "book?perPage=5&withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Category",
                        "field" : "category.text"
                    },
                    {
                        "text" : "Author",
                        "field" : "author.full_name"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "all_loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Deactivate",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|book"
                    },
                    {
                        "name" : "View",
                        "class" : "btn btn-primary mx-1",
                        "onClick" : "dispatch|navigation/openBookPage"
                    },
                ],
                "table_options" : [
                    {
                        "name" : "Create new book",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchInputs : {
                    "categories" : {
                        "label" : "Categories",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "hint" : "Click to show options",
                        "source" : "get|category?noPage=true",
                        "options_text_field" : "text"
                    },
                    'authors' : {
                        "label" : "Authors",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "hint" : "Click to show options",
                        "source" : "get|author?noPage=true",
                        "options_text_field" : "full_name",
                        'class' : 'mx-2'
                    }
                },
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Categories" : {
                "title" : "Category",
                "weight" : 95,
                "endpoint" : "category?withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "text"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Active books",
                        "field" : "books_count"
                    },
                    {
                        "text" : "Associated books",
                        "field" : "all_books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Deactivate",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|category"
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/booksWithCategory"
                    }
                ],
                "table_options" : [
                    {
                        "name" : "Create new category",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Authors" : {
                "title" : "Author",
                "weight" : 95,
                "endpoint" : "author?withBookCount=true&withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Last name",
                        "field" : "last_name"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Active books",
                        "field" : "books_count"
                    },
                    {
                        "text" : "Associated books",
                        "field" : "all_books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Deactivate",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|author"
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/booksWithAuthor"
                    }
                ],
                "table_options" : [
                    {
                        "name" : "Create new author",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Links" : {
                "title" : "Link",
                "endpoint" : "link?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Text",
                        "field" : "text"
                    },
                    {
                        "text" : "Leads to",
                        "field" : "to"
                    },
                    {
                        "text" : "Shown to",
                        "field" : "access_level.access_level",
                        "change" : function(item){
                            return item.access_level.name;
                        }
                    },
                    {
                        "text" : "Position",
                        "field" : "link_position.position"
                    },
                    {
                        "text" : "Weight",
                        "field" : "weight"
                    },
                    {
                        "text" : "Icon",
                        "field" : "icon"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                ],
                itemOptions : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Delete",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|link"
                    }
                ],
                "table_options" : [
                    {
                        "name" : "Create new link",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Users" : {
                "title" : "User",
                "weight" : 100,
                "endpoint" : "user",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Email",
                        "field" : "email"
                    },
                    {
                        "text" : "Access level",
                        "field" : "access_level.access_level",
                        "change" : function(item){
                            return item.access_level.name;
                        }
                    },
                    {
                        "text" : "Active loans",
                        "field" : "loans_count"
                    },
                    {
                        "text" : "Registered on",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Email verified at",
                        "field" : "email_verified_at"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Assume",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "dispatch|admin/assumeUser"
                    },
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Message Types" : {
                "title" : "Message type",
                "weight" : 50,
                "endpoint" : "messagetype?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Number of messages",
                        "field" : "messages_count"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Delete",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|messagetype"
                    },
                    {
                        "name" : "View messages",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/messagesOfType"
                    },
                ],
                "table_options" : [
                    {
                        "name" : "Create new message type",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Messages" : {
                "title" : "Message",
                "weight" : 45,
                "endpoint" : "message",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Sender",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Sent at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Title",
                        "field" : "title"
                    },
                    {
                        "text" : "Message type",
                        "field" : "message_type.name"
                    },
                    {
                        "text" : "Body (Shortened)",
                        "field" : "body",
                        "change" : function(item){
                            return LimitToFullWords(item.body, 30);
                        }
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Delete",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|message"
                    },
                ],
                items : [],
                searchInputs : {
                    "message_types" : {
                        "label" : "Message types",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "hint" : "Click to show options",
                        "source" : "get|messagetype?noPage=true",
                        "options_text_field" : "name"
                    },
                },
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Returned loans" : {
                "title" : "Loan",
                "weight" : 90,
                "endpoint" : "loan?previous=true&panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "User",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Book",
                        "field" : "book.name"
                    },
                    {
                        "text" : "Loaned on",
                        "field" : "started_at"
                    },
                    {
                        "text" : "Returned on",
                        "field" : "returned_at",
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "View book",
                        "class" : "btn btn-primary mx-1",
                        "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                    },
                ],
                items : [],
                searchInputs : {
                    "since" : {
                        label : "Loaned after",
                        field_type : "datetime"
                    }
                },
                searchParams : {
                    "since" : undefined
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Inactive books" : {
                "title" : "Book",
                "weight" : 90,
                "endpoint" : "book?perPage=5&previous=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Category",
                        "field" : "category.text"
                    },
                    {
                        "text" : "Author",
                        "field" : "author.full_name"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Deactivated at",
                        "field" : "deleted_at"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "all_loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Reactivate",
                        "class" : "btn btn-success mx-1",
                        "onClick" : "patch|book/restore"
                    },
                    {
                        "name" : "View",
                        "class" : "btn btn-primary mx-1",
                        "onClick" : "dispatch|navigation/openBookPage"
                    },
                ],
                items : [],
                searchInputs : {
                    "categories" : {
                        "label" : "Categories",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "name" : "Category",
                        "hint" : "Click to show options",
                        "source" : "get|category?noPage=true&currentAndPrevious=true&statusInName=true",
                        "options_text_field" : "text",
                        'class' : 'mx-2'
                    },
                    'authors' : {
                        "label" : "Authors",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "hint" : "Click to show options",
                        "source" : "get|author?noPage=true&currentAndPrevious=true&statusInName=true",
                        "options_text_field" : "full_name_status",
                        'class' : 'mx-2'
                    }
                },
                searchParams : {
                },
                "selectedSort" : "",
                page : 1,
                maximumPage : 1,
            },
            "Inactive categories" : {
                "title" : "Category",
                "weight" : 95,
                "endpoint" : "category?previous=true&withLoanCount=true&withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "text"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Deactivated at",
                        "field" : "deleted_at"
                    },
                    {
                        "text" : "Associated books",
                        "field" : "all_books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    },
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Reactivate",
                        "class" : "btn btn-success mx-1",
                        "onClick" : "patch|category/restore"
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/inactiveBooksWithCategory"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "selectedSort" : "",
                page : 1,
                maximumPage : 1,
            },
            "Inactive authors" : {
                "title" : "Author",
                "weight" : 95,
                "endpoint" : "author?withBookCount=true&previous=true&withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Last name",
                        "field" : "last_name"
                    },
                    {
                        "text" : "Created at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Deactivated at",
                        "field" : "deleted_at"
                    },
                    {
                        "text" : "Associated books",
                        "field" : "all_books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Reactivate",
                        "class" : "btn btn-success mx-1",
                        "onClick" : "patch|author/restore"
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/inactiveBooksWithAuthor"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
        },
        currentTab : "Active loans"
    },

    actions : {
        async assumeUser(context, userId){
            let response = await axiosInstance.get(`user/assume/${userId}`);

            if(!response.success){
                return {success : false};
            }

            router.push("/").catch(() => {});

            context.commit("messages/display", {text : "Successfully assumed user", success : true}, {root : true});
            context.commit("user/changeToken", response.body, {root : true});

            return {success : true};
        },
        inactiveBooksWithAuthor(context, authorId){
            Vue.set(context.state.adminTabs['Inactive books'].searchParams, 'categories', []);
            Vue.set(context.state.adminTabs['Inactive books'].searchParams, 'authors', [authorId]);
            Vue.set(context.state, 'currentTab', "Inactive books");

            return {success : true};
        },
        booksWithAuthor(context, authorId){
            Vue.set(context.state.adminTabs.Books.searchParams, 'categories', []);
            Vue.set(context.state.adminTabs.Books.searchParams, 'authors', [authorId]);
            Vue.set(context.state, 'currentTab', "Books");

            return {success : true};
        },
        inactiveBooksWithCategory(context, categoryId){
            Vue.set(context.state.adminTabs['Inactive books'].searchParams, 'authors', []);
            Vue.set(context.state.adminTabs['Inactive books'].searchParams, 'categories', [categoryId]);
            Vue.set(context.state, 'currentTab', "Inactive books");

            return {success : true};
        },
        booksWithCategory(context, categoryId){
            Vue.set(context.state.adminTabs['Books'].searchParams, 'authors', []);
            Vue.set(context.state.adminTabs.Books.searchParams, 'categories', [categoryId]);
            Vue.set(context.state, 'currentTab', "Books");

            return {success : true};
        },
        messagesOfType(context, messageTypeId){
            Vue.set(context.state.adminTabs['Messages'].searchParams, 'message_types', [messageTypeId]);
            Vue.set(context.state, 'currentTab', "Messages");
            return {success : true}
        }
    },

    mutations : {
        setTabs(state, newTabs){
            state.adminTabs = newTabs;
        },
        setCurrentTab(state, newTab){
            state.currentTab = newTab;
        },
        setItemsForTab(state, newItems){
            state.adminTabs[state.currentTab].items = newItems;
        },
        setTabField(state, fieldAndValue){
            let {name, value} = fieldAndValue;

            let tab = state.adminTabs[state.currentTab];

            Vue.set(tab, name, value);
        },
        setTabSearchParam(state, fieldAndValue){
            let {field, value} = fieldAndValue;

            let tab = state.adminTabs[state.currentTab];

            tab.searchParams[field] = value;
        }
    },

    getters : {
        getTabs(state){
            return state.adminTabs;
        },
        getCurrentTab(state){
            return state.currentTab;
        },
        getTab(state){
           return state.adminTabs[state.currentTab]; 
        }
    }
}