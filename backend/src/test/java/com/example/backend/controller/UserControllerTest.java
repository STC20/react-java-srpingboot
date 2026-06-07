package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerUnitTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    // ---------------- GET ALL ----------------
    @Test
    void getAllUsers_callsService() {
        when(userService.getAllUsers()).thenReturn(List.of());

        userController.getAllUsers();

        verify(userService, times(1)).getAllUsers();
    }

    // ---------------- GET BY ID ----------------
    @Test
    void getUserById_callsService() {
        Long id = 1L;

        userController.getUserById(id);

        verify(userService, times(1)).getUserById(id);
    }

    // ---------------- CREATE VALID ----------------
    @Test
    void createUser_validEmail_callsService() {
        User user = new User();
        user.setEmail("test@example.com");

        userController.createUser(user);

        verify(userService, times(1)).createUser(user);
    }

    // ---------------- CREATE INVALID EMAIL ----------------
    @Test
    void createUser_invalidEmail_throwsException() {
        User user = new User();
        user.setEmail("bogusemail");

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> userController.createUser(user)
        );

        assertTrue(ex.getReason().contains("Invalid email format"));
        verifyNoInteractions(userService);
    }

    // ---------------- UPDATE VALID ----------------
    @Test
    void updateUser_validEmail_callsService() {
        Long id = 1L;

        User user = new User();
        user.setEmail("test@example.com");

        userController.updateUser(id, user);

        verify(userService, times(1)).updateUser(id, user);
    }

    // ---------------- UPDATE INVALID ----------------
    @Test
    void updateUser_invalidEmail_throwsException() {
        Long id = 1L;

        User user = new User();
        user.setEmail("bademail");

        assertThrows(
                ResponseStatusException.class,
                () -> userController.updateUser(id, user)
        );

        verifyNoInteractions(userService);
    }

    // ---------------- DELETE ----------------
    @Test
    void deleteUser_callsService() {
        Long id = 1L;

        userController.deleteUser(id);

        verify(userService, times(1)).deleteUser(id);
    }
}


// package com.example.backend.controller;

// import com.example.backend.model.User;
// import com.example.backend.service.UserService;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// import static org.mockito.Mockito.*;

// @ExtendWith(MockitoExtension.class)
// class UserControllerUnitTest {

//     @Mock
//     private UserService userService;

//     @InjectMocks
//     private UserController userController;

//     @Test
//     void createUser_validUser_callsService() {
//         User user = new User();
//         user.setName("Test");
//         user.setEmail("test@example.com");

//         userController.createUser(user);

//         verify(userService, times(1)).createUser(user);
//     }

//     @Test
//     void createUser_invalidEmail_still_callsService_because_unit_test() {
//         User user = new User();
//         user.setName("Test");
//         user.setEmail("bogusemail");

//         userController.createUser(user);

//         // IMPORTANT:
//         // In unit test, controller does NOT validate email unless you manually coded it
//         verify(userService, times(1)).createUser(user);
//     }
// }

// // package com.example.backend.controller;

// // import com.example.backend.model.User;
// // import com.example.backend.service.UserService;
// // import org.junit.jupiter.api.Test;
// // import org.junit.jupiter.api.extension.ExtendWith;
// // import org.mockito.InjectMocks;
// // import org.mockito.Mock;
// // import org.mockito.junit.jupiter.MockitoExtension;

// // import static org.mockito.Mockito.*;

// // @ExtendWith(MockitoExtension.class)
// // class UserControllerUnitTest {

// //     @Mock
// //     private UserService userService;

// //     @InjectMocks
// //     private UserController userController;

// //     @Test
// //     void createUser_validUser_callsService() {
// //         // arrange
// //         User user = new User();
// //         user.setName("Test");
// //         user.setEmail("test@example.com");

// //         // act
// //         userController.createUser(user);

// //         // assert
// //         verify(userService, times(1)).createUser(user);
// //     }

// //     @Test
// //     void createUser_invalidEmail_stillCallsControllerLogic() {
// //         User user = new User();
// //         user.setName("Test");
// //         user.setEmail("bogusemail");

// //         userController.createUser(user);

// //         // ⚠️ depends on your controller logic:
// //         // If validation is inside controller -> service should NOT be called
// //         verifyNoInteractions(userService);
// //     }
// // }

// // package com.example.backend.controller;

// // import com.example.backend.exception.GlobalExceptionHandler;
// // import com.example.backend.service.UserService;
// // import org.junit.jupiter.api.BeforeEach;
// // import org.junit.jupiter.api.Test;
// // import org.junit.jupiter.api.extension.ExtendWith;
// // import org.mockito.Mock;
// // import org.mockito.junit.jupiter.MockitoExtension;
// // import org.springframework.http.MediaType;
// // import org.springframework.test.web.servlet.MockMvc;
// // import org.springframework.test.web.servlet.setup.MockMvcBuilders;

// // import static org.mockito.Mockito.verifyNoInteractions;
// // import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// // import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// // import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// // @ExtendWith(MockitoExtension.class)
// // class UserControllerTest {

// //     private MockMvc mockMvc;

// //     @Mock
// //     private UserService userService;

// //     @BeforeEach
// //     void setup() {
// //         UserController userController = new UserController(userService);
// //         mockMvc = MockMvcBuilders.standaloneSetup(userController)
// //                 .setControllerAdvice(new GlobalExceptionHandler())
// //                 .build();
// //     }

// //     @Test
// //     void createUser_withInvalidEmail_returnsBadRequest() throws Exception {
// //         String requestBody = "{" +
// //                 "\"name\":\"Test\"," +
// //                 "\"email\":\"bogusemail\"" +
// //                 "}";

// //         mockMvc.perform(post("/api/users")
// //                 .contentType(MediaType.APPLICATION_JSON)
// //                 .content(requestBody))
// //             .andExpect(status().isBadRequest())
// //             .andExpect(jsonPath("$.email").value("Invalid email format"));

// //         verifyNoInteractions(userService);
// //     }
// // }